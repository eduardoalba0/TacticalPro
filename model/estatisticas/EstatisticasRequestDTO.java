package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas;

import br.edu.ifpr.bsi.sistemaclubesoft.model.jogador.JogadorRequestDTO;

public record EstatisticasRequestDTO(
                int gols,
                int assistencias,
                int passes,
                int jogos,
                float minutosJogados,
                int desarmes,
                int cartoesAmarelos,
                int cartoesVermelhos,
                int faltasJogador,
                JogadorRequestDTO jogador
) {
}
