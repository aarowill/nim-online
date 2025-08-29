{
  # https://status.nixos.org/
  nixpkgs = fetchTarball {
    name = "nixos-25.05-2025-08-28";
    url = "https://github.com/NixOS/nixpkgs/archive/4e7667a90c167f7a81d906e5a75cba4ad8bee620.tar.gz";
    sha256 = "1spjsasb7krm1063sxy93mjv0jq09kdqh3s7xq479nzr4dym4zac";
  };
}
