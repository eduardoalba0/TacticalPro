package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversarioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversarioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.EstatisticasAdversarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/EstatisticasAdversarios")
public class EstatisticasAdversarioController {
    @Autowired
    private EstatisticasAdversarioService estatisticasAdversarioService;

    @GetMapping
    public ResponseEntity<List<EstatisticasAdversarioDetailDTO>> listar(){
        List<EstatisticasAdversarioDetailDTO> estatisticas = this.estatisticasAdversarioService.listar();
        return ResponseEntity.ok(estatisticas);
    }


    @PostMapping
    public ResponseEntity<EstatisticasAdversarioDetailDTO> inserir(@RequestBody EstatisticasAdversarioRequestDTO request){
        EstatisticasAdversarioDetailDTO estatisticasSalvas = estatisticasAdversarioService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(estatisticasSalvas);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<EstatisticasAdversarioDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody EstatisticasAdversarioRequestDTO request){
        EstatisticasAdversarioDetailDTO estatisticasAdversarioAtualizado = estatisticasAdversarioService.atualizar(codigo, request);
        return ResponseEntity.ok(estatisticasAdversarioAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        estatisticasAdversarioService.excluir(codigo);
    }

}
