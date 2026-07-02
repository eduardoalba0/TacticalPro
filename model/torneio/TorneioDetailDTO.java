package br.edu.ifpr.bsi.sistemaclubesoft.model.torneio;

public record TorneioDetailDTO(
        Long codigo,
        String nome,
        String temporada,
        String organizador,
        String tipo
) {
}

