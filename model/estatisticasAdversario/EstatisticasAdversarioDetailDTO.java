package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario;

public record EstatisticasAdversarioDetailDTO(
        Long codigo,
        String posseMediaBola,
        String golsSofridos,
        String formacaoComum,
        Long timeAdversarioCodigo,
        Long torneioCodigo
) {
}

