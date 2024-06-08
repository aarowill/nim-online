let
  pkgsSrc = fetchTarball {
    name = "nixos-24.05-2024-06-06";
    url = "https://github.com/NixOS/nixpkgs/archive/0b8e7a1ae5a94da2e1ee3f3030a32020f6254105.tar.gz";
    sha256 = "1rzdqgs00vzw69m569li3c6yvkdlqf7zihiivi4n83lfqginr7ar";
  };

  base = import "${pkgsSrc}/nixos" { configuration = ./systemImage.nix; };
in
{
  image = base.config.system.build.qcow;
}