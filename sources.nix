{
  # https://status.nixos.org/
  nixpkgs = fetchTarball {
    name = "nixos-25.05-2025-07-21";
    url = "https://github.com/NixOS/nixpkgs/archive/f01fe91b0108a7aff99c99f2e9abbc45db0adc2a.tar.gz";
    sha256 = "1wx7rx66prphrsizqb5ivcj5l86bv3gy47vl8fcqk1gnnzc14pim";
  };
}
