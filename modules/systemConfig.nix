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
          # MBP
          "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIk4ZcfPqqykrkiKZ0EsLyQCZ1pHpUpnODik8uZOTc7J ssh@aarowill.ca"
        ];
        hashedPassword = "$6$wdswmUrNpL$UjNAEVmcbnnQ6AI38JZJ2U2U3RVy.9BWFuPov1EfLm0uV9bq5iRUxd5oz7wrDzb30tQnFPy26F/9Ms7nhY93L/";
      };
    };
  };

  nix.trustedUsers = [
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

  # Enable goatcounter analytics (port 8080)
  services.goatcounter.enable = true;

  # Enable the API service (port 8081)
  services.nimOnline.enable = true;

  # Configure reverse proxy for hosting api + frontend and tls termination
  services.caddy = {
    enable = true;
    configFile = pkgs.writeText "nimCaddyConfig" ''
      {
          email certificates@aarowill.ca
      }

      # Health check endpoint
      # :8080 {
      #     respond /health 200
      # }

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
