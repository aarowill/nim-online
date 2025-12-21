{
  # https://status.nixos.org/
  nixpkgs = fetchTarball {
    name = "nixos-25.11-2025-12-20";
    url = "https://github.com/NixOS/nixpkgs/archive/b3aad468604d3e488d627c0b43984eb60e75e782.tar.gz";
    sha256 = "0c4y2a8fcrjyx2smhpzm6qridvgbq1x5fqq3safs5b78x8zl16bs";
  };
}
