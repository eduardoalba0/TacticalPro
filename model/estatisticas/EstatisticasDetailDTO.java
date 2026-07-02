package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas;

import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorResponseDTO;

public record EstatisticasDetailDTO(
        Long codigo,
        int gols,
        int assistencias,
        int passes,
        int jogos,
        float minutosJogados,
        int desarmes,
        int cartoesAmarelos,
        int cartoesVermelhos,
        int faltasJogador,
        JogadorResponseDTO jogador
) {
}
