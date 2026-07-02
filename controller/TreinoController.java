package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.treino.TreinoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.treino.TreinoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.TreinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treinos")
@CrossOrigin(origins = "http://localhost:5173")
public class TreinoController {

    @Autowired
    private TreinoService treinoService;

    @GetMapping
    public ResponseEntity<List<TreinoDetailDTO>> listar(){
        List<TreinoDetailDTO> treinos = this.treinoService.listar();
        return ResponseEntity.ok(treinos);
    }


    @PostMapping
    public ResponseEntity<TreinoDetailDTO> inserir(@RequestBody TreinoRequestDTO request){
        TreinoDetailDTO treinoSalvo = treinoService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(treinoSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<TreinoDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody TreinoRequestDTO request){
        TreinoDetailDTO treinoAtualizado = treinoService.atualizar(codigo, request);
        return ResponseEntity.ok(treinoAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        treinoService.excluir(codigo);
    }
}
