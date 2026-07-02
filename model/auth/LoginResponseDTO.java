package br.edu.ifpr.bsi.sistemaclubesoft.model.auth;

public record LoginResponseDTO(boolean autenticado,
                               String mensagem,
                               Long codigoTecnico,
                               String nome,
                               String email) {
}

