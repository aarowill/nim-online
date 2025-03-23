let
  pkgsSrc = fetchTarball {
    name = "nixos-24.11-2025-03-23";
    url = "https://github.com/NixOS/nixpkgs/archive/7105ae3957700a9646cc4b766f5815b23ed0c682.tar.gz";
    sha256 = "0j3jd82iyyck4hpmz7pkak1v27l7pydl0c3vvyz6wfpi612x8xzi";
  };

  system = "x86_64-linux";

  # Build packages using nixpkgs
  pkgs = import pkgsSrc { inherit system; };

  client = pkgs.callPackage ./client { };
  api = pkgs.callPackage ./api { };

  # Get a new nixpkgs with my custom packages overlaid for passing into the image build
  customPkgs = import pkgsSrc {
    inherit system;
    overlays = [
      (final: prev: {
        nimClient = client;
        nimApi = api;
      })
    ];
  };

  eval =
    config:
    import "${pkgsSrc}/nixos/lib/eval-config.nix" {
      inherit system;
      modules = [
        ./modules/nimOnline.nix
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
}
