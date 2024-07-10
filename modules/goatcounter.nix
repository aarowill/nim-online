{
  config,
  lib,
  pkgs,
  ...
}:
let
  cfg = config.services.goatcounter;
in
{
  options.services.goatcounter = {
    enable = lib.mkEnableOption "GoatCounter Service";
  };

  config = lib.mkIf cfg.enable {
    systemd.services."goatcounter" = {
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      serviceConfig = {
        Type = "simple";
        User = "goatcounter";
        Group = "goatcounter";
        DynamicUser = true;
        StateDirectory = "goatcounter";
        ExecStart = ''
          ${pkgs.goatcounter}/bin/goatcounter serve \
            -db "sqlite+$STATE_DIRECTORY/goatcounter.sqlite3"
            -automigrate \
            -listen localhost:8080 \
            -tls proxy
        '';
      };
    };
  };
}
