package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario;

public record EstatisticasAdversarioRequestDTO(
        String posseMediaBola,
        String golsSofridos,
        String formacaoComum,
        Long timeAdversarioCodigo,
        Long torneioCodigo
) {
}

