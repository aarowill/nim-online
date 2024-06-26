{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.services.nimOnline;
in
{
  options.services.nimOnline = {
    enable = lib.mkEnableOption "Nim Online Service";
  };

  config = lib.mkIf cfg.enable {
    systemd.services."nim-api" = {
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];
      path = [
        pkgs.nodejs
        pkgs.bash
      ];

      serviceConfig = {
        Type = "simple";
        User = "nimonline";
        Group = "nimonline";
        DynamicUser = true;
        WorkingDirectory = "${pkgs.nimApi}/api";
        ExecStart = "${pkgs.nodejs}/bin/npm run start";
      };
    };
  };
}
