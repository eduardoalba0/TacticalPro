package br.edu.ifpr.bsi.sistemaclubesoft.repositories;

import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeAdversarioRepository extends JpaRepository<TimeAdversario,Long> {
    List<TimeAdversario> findByNome(String nome);
}
