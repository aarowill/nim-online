import { Box, Button, TextField, Typography } from '@material-ui/core';
import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import React, { PureComponent, ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import type { Socket } from 'socket.io-client';
import LogoContainerView from '../components/LogoContainerView';
import { ErrorResponse, JoinGameResponse } from '../interfaces/eventResponse';
import { GameRedirectState } from '../interfaces/gameRedirectState';
import { NimGame } from '../interfaces/nim';
import SocketContext from '../contexts/SocketContext';

const defaultHelperText = 'Enter code to join game';
const validCodeRegex = /^[ABCDEFGHJKLMNPQRSTUVWXYZ]*$/;

interface JoinGameProps extends RouteComponentProps, WithTheme {}

interface JoinGameWithSocketProps extends JoinGameProps {
  socket: Socket | undefined;
}

interface JoinGameWithSocketState {
  joinCode: string;
  isValid: boolean;
  helperText: string;
  gameJoined: boolean;
  startingGame: boolean;
  player: 0 | 1;
}

class JoinGameWithSocket extends PureComponent<JoinGameWithSocketProps, JoinGameWithSocketState> {
  constructor(props: JoinGameWithSocketProps) {
    super(props);

    this.state = {
      joinCode: '',
      isValid: true,
      helperText: defaultHelperText,
      gameJoined: false,
      startingGame: false,
      player: 1,
    };

    this.handleGameStarted = this.handleGameStarted.bind(this);
    this.handlePlayerLeft = this.handlePlayerLeft.bind(this);
    this.tryJoin = this.tryJoin.bind(this);
    this.updateJoinCode = this.updateJoinCode.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    if (socket == null) {
      return;
    }

    socket.on('gameStarted', this.handleGameStarted);
    socket.on('playerLeft', this.handlePlayerLeft);
  }

  componentWillUnmount() {
    const { gameJoined, startingGame } = this.state;
    const { socket } = this.props;

    if (socket == null) {
      return;
    }

    socket.off('gameStarted', this.handleGameStarted);
    socket.off('playerLeft', this.handlePlayerLeft);

    if (!startingGame && gameJoined) {
      socket.emit('playerLeft');
    }
  }

  handleGameStarted(game: NimGame) {
    const { joinCode, player } = this.state;
    const { history } = this.props;

    const redirectState: GameRedirectState = {
      game,
      player,
    };

    this.setState(() => ({ startingGame: true }));

    history.push(`/game?code=${joinCode}`, redirectState);
  }

  handlePlayerLeft() {
    const { socket } = this.props;

    this.setState(() => ({
      joinCode: '',
      gameJoined: false,
      isValid: false,
      helperText: 'Player 1 left, please join another game',
    }));

    if (socket == null) {
      return;
    }

    socket.emit('playerLeft');
  }

  tryJoin() {
    const { joinCode } = this.state;
    const { socket } = this.props;

    if (socket == null) {
      return;
    }

    socket.emit('joinGame', { joinCode }, (response: JoinGameResponse | ErrorResponse) => {
      if (!response.success) {
        this.setState(() => ({
          isValid: false,
          helperText: response.errorMessage,
        }));
        return;
      }

      this.setState(() => ({ gameJoined: true, player: response.playerNumber }));
    });
  }

  updateJoinCode(joinCode: string) {
    if (validCodeRegex.test(joinCode)) {
      this.setState(() => ({ isValid: true, helperText: defaultHelperText }));
    } else {
      this.setState(() => ({ isValid: false, helperText: 'Invalid join code' }));
    }

    this.setState(() => ({ joinCode }));
  }

  render() {
    const { gameJoined, isValid, joinCode, helperText } = this.state;
    const { theme } = this.props;

    return (
      <LogoContainerView>
        {gameJoined ? (
          <>
            <Box marginY={2}>
              <Typography variant="h5">Waiting for player 1 to start the game...</Typography>
            </Box>
            <ClimbingBoxLoader color={theme.palette.primary.main} />
          </>
        ) : (
          <Box marginTop={2} width="16rem">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                this.tryJoin();
              }}
              autoComplete="off"
            >
              <Box display="flex" flexDirection="column">
                <TextField
                  variant="filled"
                  label="Join Code"
                  name="joinCode"
                  error={!isValid}
                  required
                  autoFocus
                  value={joinCode}
                  onChange={(event) => this.updateJoinCode(event.target.value.toUpperCase().trim())}
                  helperText={helperText}
                />
                <Box marginTop={2} alignSelf="center">
                  <Button
                    disabled={!isValid || joinCode === ''}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Join
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        )}
      </LogoContainerView>
    );
  }
}

function JoinGame(props: JoinGameProps): ReactElement {
  return (
    // Justification: This is a higher order component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SocketContext.Consumer>{(socket) => <JoinGameWithSocket socket={socket} {...props} />}</SocketContext.Consumer>
  );
}

export default withRouter(withTheme(JoinGame));
