{ buildNpmPackage }:
buildNpmPackage {
  pname = "nim-online-client";
  version = "0.2.0";

  # TODO exclude node_modules and some others
  src = ./.;

  npmDepsHash = "sha256-JLKlja9PGTin+5MMN5DPwOBe9yptHHpYeOjQ563PxBg=";

  # The prepack script runs the build script, which we'd rather do in the build phase.
  npmPackFlags = [ "--ignore-scripts" ];

  # Not sure yet if I want to bother with this
  # env = {
  #   PUBLIC_URL = "https://nim-online.aarowill.ca";
  # };

  installPhase = ''
    mkdir -p $out/public
    cp -r build/* $out/public
  '';
}
