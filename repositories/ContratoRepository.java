package br.edu.ifpr.bsi.sistemaclubesoft.repositories;


import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato,Long> {


    List<Contrato> findBySalario(float salario);
}
