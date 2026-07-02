package br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas;

public record EstatisticasSummaryDTO(
                int gols,
                int assistencias,
                int passes,
                int jogos,
                float minutosJogados,
                int desarmes,
                int cartoesAmarelos,
                int cartoesVermelhos,
                int faltasJogador
) {
}
