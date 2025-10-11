{
  # https://status.nixos.org/
  nixpkgs = fetchTarball {
    name = "nixos-25.05-2025-10-10";
    url = "https://github.com/NixOS/nixpkgs/archive/5da4a26309e796daa7ffca72df93dbe53b8164c7.tar.gz";
    sha256 = "1v7cpghxf5rl1l0rj32n89jv5w7z34lld0kiai8kd50s97fvw8n1";
  };
}
