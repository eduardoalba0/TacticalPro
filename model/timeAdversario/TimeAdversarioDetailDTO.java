package br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario;

public record TimeAdversarioDetailDTO(
        Long codigo,
        String nome,
        String pontosFortes,
        String pontosFracos,
        String tecnicoAdversario
) {
}

