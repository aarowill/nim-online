{ buildNpmPackage }:
buildNpmPackage {
  pname = "nim-online-api";
  version = "0.2.0";

  # TODO exclude node_modules and some others
  src = ./.;

  npmDepsHash = "sha256-hnjMZXY3YRVKmN8hSH9yL3hwtlD+fX1qj/RNepE71iw=";

  # The prepack script runs the build script, which we'd rather do in the build phase.
  npmPackFlags = [ "--ignore-scripts" ];

  installPhase = ''
    mkdir -p $out/api
    cp -r dist env node_modules package*.json $out/api/
  '';
}
