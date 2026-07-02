package br.edu.ifpr.bsi.sistemaclubesoft.model.partida;

import java.util.Date;

public record PartidaDetailDTO(
        Long codigo,
        Date data,
        String hora,
        String local,
        String mandoDeCampo,
        String resultadoFinal,
        Long torneioCodigo,
        Long timeAdversarioCodigo
) {
}

