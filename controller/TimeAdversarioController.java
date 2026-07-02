package br.edu.ifpr.bsi.sistemaclubesoft.controller;

import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversarioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversarioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.services.TimeAdversarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timesAdversarios")
public class TimeAdversarioController {

    @Autowired
    private TimeAdversarioService timeAdversarioService;

    @GetMapping
    public ResponseEntity<List<TimeAdversarioDetailDTO>> listar(){
        List<TimeAdversarioDetailDTO> timesAdversarios = this.timeAdversarioService.listar();
        return ResponseEntity.ok(timesAdversarios);
    }


    @PostMapping
    public ResponseEntity<TimeAdversarioDetailDTO> inserir(@RequestBody TimeAdversarioRequestDTO request){
        TimeAdversarioDetailDTO timeAdversarioSalvo = timeAdversarioService.salvar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(timeAdversarioSalvo);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<TimeAdversarioDetailDTO> atualizar(@PathVariable Long codigo, @RequestBody TimeAdversarioRequestDTO request){
        TimeAdversarioDetailDTO timeAdversarioAtualizado = timeAdversarioService.atualizar(codigo, request);
        return ResponseEntity.ok(timeAdversarioAtualizado);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long codigo){
        timeAdversarioService.excluir(codigo);
    }
}
