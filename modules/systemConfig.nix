{ pkgs, ... }:
{
  # List all users here declaratively
  users = {
    # Manage users declaratively (users match this file when configuration is run)
    mutableUsers = false;

    # Users and their preferences
    users = {
      aaron = {
        description = "Aaron Williamson";
        isNormalUser = true;
        extraGroups = [ "wheel" ];
        openssh.authorizedKeys.keys = [
          # Main key
          "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGiFaoFW9+h972eJBgKNZur94At5hIpootcBmGKzyojw ssh@aarowill.ca"
        ];
        hashedPassword = "$6$wdswmUrNpL$UjNAEVmcbnnQ6AI38JZJ2U2U3RVy.9BWFuPov1EfLm0uV9bq5iRUxd5oz7wrDzb30tQnFPy26F/9Ms7nhY93L/";
      };
    };
  };

  system.stateVersion = "24.05";

  nix.settings.trusted-users = [
    "root"
    "aaron"
  ];

  # Enable the OpenSSH daemon.
  services.openssh = {
    enable = true;
    ports = [ 55522 ];
    settings = {
      PasswordAuthentication = false;
      PermitRootLogin = "no";
    };
  };

  # Passwordless sudo
  security.sudo.wheelNeedsPassword = false;

  # Enable goatcounter analytics
  services.goatcounter = {
    enable = true;
    proxy = true;
    port = 8080;
    extraArgs = [
      "-db" "sqlite+goatcounter.sqlite3"
      "-automigrate"
    ];
  };

  # Enable the API service (port 8081)
  services.nimOnline.enable = true;

  # Configure reverse proxy for hosting api + frontend and tls termination
  services.caddy = {
    enable = true;
    configFile = pkgs.writeText "nimCaddyConfig" ''
      {
          email certificates@aarowill.ca
      }

      nim-online.aarowill.ca {
          root * ${pkgs.nimClient}/public
          reverse_proxy /api/* localhost:8081

          file_server
          encode zstd gzip

          @sparequests {
              not path /api/*
              not file {
                  try_files {path} {path}/
              }
          }
          rewrite @sparequests /
      }

      nim-analytics.aarowill.ca {
          reverse_proxy localhost:8080
      }

      plexpub.aarowill.ca {
          reverse_proxy thicc.aarowill.ca:36847
      }
    '';
  };

  # Firewall config
  networking.firewall = {
    enable = true;
    allowedTCPPorts = [
      80
      443
    ];
  };
}
