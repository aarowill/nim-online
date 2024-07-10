let
  pkgsSrc = fetchTarball {
    name = "nixos-24.05-2024-07-03";
    url = "https://github.com/NixOS/nixpkgs/archive/d032c1a6dfad4eedec7e35e91986becc699d7d69.tar.gz";
    sha256 = "14g286p6dh0j1qbkmw2520si2lbbjmbmr119496jkmpk6516n3v7";
  };

  system = "x86_64-linux";

  # Build packages using nixpkgs
  pkgs = import pkgsSrc { inherit system; };

  client = pkgs.callPackage ./client { };
  api = pkgs.callPackage ./api { };
  goatcounter = pkgs.callPackage ./analytics { };

  # Get a new nixpkgs with my custom packages overlaid for passing into the image build
  customPkgs = import pkgsSrc {
    inherit system;
    overlays = [
      (final: prev: {
        nimClient = client;
        nimApi = api;
        goatcounter = goatcounter;
      })
    ];
  };

  eval =
    config:
    import "${pkgsSrc}/nixos/lib/eval-config.nix" {
      inherit system;
      modules = [
        ./modules/nimOnline.nix
        ./modules/goatcounter.nix
        config
      ];
      pkgs = customPkgs;
    };

  qemu = eval ./modules/qemuImage.nix;
in
{
  qemu = qemu.config.system.build.qcow;
  pushable = qemu.config.system.build.toplevel;
  client = client;
  api = api;
  goatcounter = goatcounter;
}
