package br.edu.ifpr.bsi.sistemaclubesoft.model.partida;

import java.util.Date;

public record PartidaRequestDTO(
        Date data,
        String hora,
        String local,
        String mandoDeCampo,
        String resultadoFinal,
        Long torneioCodigo,
        Long timeAdversarioCodigo
) {
}

