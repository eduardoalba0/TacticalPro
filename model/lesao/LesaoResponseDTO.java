package br.edu.ifpr.bsi.sistemaclubesoft.model.lesao;

public record LesaoResponseDTO(
        Long codigo,
        String tipoLesao,
        String gravidade,
        String inicio,
        String fim,
        String ObservacaoDP,
        String PrevisaoRetorno
) {
}
