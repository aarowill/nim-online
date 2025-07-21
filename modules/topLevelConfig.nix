{ ... }:
{
  nixpkgs.pkgs = (import ../default.nix).customPkgs;
  imports = [
    ./qemuImage.nix
    ./nimOnline.nix
    ./systemConfig.nix
  ];
}
