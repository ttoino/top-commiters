{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  };

  outputs =
    {
      nixpkgs,

      ...
    }:
    let
      system = "x86_64-linux";

      pkgs = nixpkgs.legacyPackages.${system};

    in
    {

      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs
          corepack
        ];

        shellHook = ''
          export NODE_EXTRA_CA_CERTS="${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
          export SSL_CERT_FILE=/etc/ssl/certs/ca-bundle.crt
        '';
      };
    };
}
