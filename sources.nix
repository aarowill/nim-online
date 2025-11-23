{
  # https://status.nixos.org/
  nixpkgs = fetchTarball {
    name = "nixos-25.05-2025-11-23";
    url = "https://github.com/NixOS/nixpkgs/archive/c58bc7f5459328e4afac201c5c4feb7c818d604b.tar.gz";
    sha256 = "1lypgq8f1v571vgrlqj13yi97bhlw9gsqc0s9di5mn5w5fxjfd6n";
  };
}
