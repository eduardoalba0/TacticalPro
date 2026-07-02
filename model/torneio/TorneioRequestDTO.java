package br.edu.ifpr.bsi.sistemaclubesoft.model.torneio;

public record TorneioRequestDTO(
        String nome,
        String temporada,
        String organizador,
        String tipo
) {
}

