package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstatisticasAdversarioRepository extends JpaRepository<EstatisticasAdversario,Long> {

    List<EstatisticasAdversario> findByFormacaoComum(String formacaoComum);
}
