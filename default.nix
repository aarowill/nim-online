let
  sources = import ./sources.nix;
  pkgsSrc = sources.nixpkgs;

  nixos = import (pkgsSrc + "/nixos") {
    configuration = ./modules/topLevelConfig.nix;
  };

  customPkgs = import pkgsSrc {
    overlays = [
      (final: prev: {
        nimClient = prev.callPackage ./client {};
        nimApi = prev.callPackage ./api {};
      })
    ];
  };
in
{
  inherit customPkgs;
  qemu = nixos.config.system.build.qcow;
  pushable = nixos.config.system.build.toplevel;
  client = customPkgs.nimClient;
  api = customPkgs.nimApi;
}
