let
  pkgsSrc = fetchTarball {
    name = "nixos-24.05-2024-06-06";
    url = "https://github.com/NixOS/nixpkgs/archive/0b8e7a1ae5a94da2e1ee3f3030a32020f6254105.tar.gz";
    sha256 = "1rzdqgs00vzw69m569li3c6yvkdlqf7zihiivi4n83lfqginr7ar";
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
        ./nimOnline.nix
        config
      ];
      pkgs = customPkgs;
    };

  qemu = eval ./qemuImage.nix;
  baseSystem = eval ./systemConfig.nix;
in
{
  qemu = qemu.config.system.build.qcow;
  nixos = baseSystem.config.system.build.toplevel;
  client = client;
  api = api;
}
