{
  modulesPath,
  config,
  lib,
  pkgs,
  specialArgs,
  ...
}:
{
  imports = [ "${modulesPath}/profiles/qemu-guest.nix" ];

  fileSystems."/" = {
    device = "/dev/disk/by-label/nixos";
    autoResize = true;
    fsType = "ext4";
  };

  boot.growPartition = true;
  boot.kernelParams = [ "console=ttyS0" ];
  boot.loader.grub.device =
    if (pkgs.stdenv.system == "x86_64-linux") then
      (lib.mkDefault "/dev/vda")
    else
      (lib.mkDefault "nodev");

  boot.loader.grub.efiSupport = lib.mkIf (pkgs.stdenv.system != "x86_64-linux") (lib.mkDefault true);
  boot.loader.grub.efiInstallAsRemovable = lib.mkIf (pkgs.stdenv.system != "x86_64-linux") (
    lib.mkDefault true
  );
  boot.loader.timeout = 0;

  system.build.qcow = import "${toString modulesPath}/../lib/make-disk-image.nix" {
    inherit lib config pkgs;
    diskSize = specialArgs.diskSize or "auto";
    format = "qcow2";
    partitionTableType = "hybrid";
  };

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
