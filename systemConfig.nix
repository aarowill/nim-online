{ ... }:
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
        # shell = pkgs.fish;
        extraGroups = [ "wheel" ];
        openssh.authorizedKeys.keys = [
          # MBP
          "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIk4ZcfPqqykrkiKZ0EsLyQCZ1pHpUpnODik8uZOTc7J ssh@aarowill.ca"
        ];
        hashedPassword = "$6$wdswmUrNpL$UjNAEVmcbnnQ6AI38JZJ2U2U3RVy.9BWFuPov1EfLm0uV9bq5iRUxd5oz7wrDzb30tQnFPy26F/9Ms7nhY93L/";
      };
    };
  };

  # Enable the OpenSSH daemon.
  services.openssh = {
    enable = true;
    settings = {
      PasswordAuthentication = false;
      PermitRootLogin = "no";
    };
  };

  # Passwordless sudo
  security.sudo.wheelNeedsPassword = false;
}
