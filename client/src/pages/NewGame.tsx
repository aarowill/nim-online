import React, { PureComponent, ReactElement } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ErrorResponse, NewGameResponse, StartGameResponse } from '../interfaces/eventResponse';
import { NimOptions } from '../interfaces/nim';
import { GameRedirectState } from '../interfaces/gameRedirectState';
import LogoContainerView from '../components/LogoContainerView';
import GameConfiguration from '../components/GameConfiguration';
import JoinCodeDisplay from '../components/JoinCodeDisplay';
import SocketContext from '../SocketContext';

interface NewGameWithSocketProps extends RouteComponentProps {
  socket: SocketIOClient.Socket | undefined;
}

interface NewGameWithSocketState {
  player2Ready: boolean;
  joinCode: string | undefined;
  startingGame: boolean;
}

class NewGameWithSocket extends PureComponent<NewGameWithSocketProps, NewGameWithSocketState> {
  constructor(props: NewGameWithSocketProps) {
    super(props);

    this.state = {
      player2Ready: false,
      joinCode: undefined,
      startingGame: false,
    };

    this.handlePlayer2Ready = this.handlePlayer2Ready.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    if (socket == null) {
      return;
    }

    socket.on('playerJoined', this.handlePlayer2Ready);

    socket.emit('newGame', ({ joinCode }: NewGameResponse) => {
      this.setState(() => ({ joinCode }));
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    const { startingGame } = this.state;

    if (socket == null) {
      return;
    }

    socket.off('playerJoined', this.handlePlayer2Ready);

    if (!startingGame) {
      socket.emit('playerLeft');
    }
  }

  startGame(config: NimOptions) {
    const { socket, history } = this.props;
    if (socket == null) {
      return;
    }

    socket.emit('startGame', config, (response: StartGameResponse | ErrorResponse) => {
      if (!response.success) {
        // TODO: do something with this error
        return;
      }

      this.setState(() => ({ startingGame: true }));

      const redirectState: GameRedirectState = {
        game: response.game,
        player: 0,
      };

      history.push(`/game?code=${response.gameCode}`, redirectState);
    });
  }

  handlePlayer2Ready() {
    this.setState(() => ({ player2Ready: true }));
  }

  render() {
    const { player2Ready, joinCode } = this.state;
    return (
      <LogoContainerView>
        <JoinCodeDisplay player2Ready={player2Ready} joinCode={joinCode} />
        <GameConfiguration player2Ready={player2Ready} onStartGame={(config) => this.startGame(config)} />
      </LogoContainerView>
    );
  }
}

function NewGame(props: RouteComponentProps): ReactElement {
  return (
    // Justification: This is a higher order component
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SocketContext.Consumer>{(socket) => <NewGameWithSocket socket={socket} {...props} />}</SocketContext.Consumer>
  );
}

export default withRouter(NewGame);
