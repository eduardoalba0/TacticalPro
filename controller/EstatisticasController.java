package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.EstatisticasDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticas.EstatisticasRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.EstatisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estatisticas")
@CrossOrigin(origins = "http://localhost:5173")
public class EstatisticasController {

    @Autowired
    private EstatisticasService estatisticasService;

    @GetMapping
    public ResponseEntity<List<EstatisticasDetailDTO>> listar(){
        List<EstatisticasDetailDTO> estatisticas = this.estatisticasService.listar();
        return ResponseEntity.ok(estatisticas);
    }


    @PostMapping
    public ResponseEntity<EstatisticasDetailDTO> inserir(@RequestBody EstatisticasRequestDTO request){
        EstatisticasDetailDTO estatisticaSalva = estatisticasService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(estatisticaSalva);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<EstatisticasDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody EstatisticasRequestDTO request){
        EstatisticasDetailDTO estatisticasAtualizada = estatisticasService.atualizar(codigo, request);
        return ResponseEntity.ok(estatisticasAtualizada);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        estatisticasService.excluir(codigo);
    }
}
