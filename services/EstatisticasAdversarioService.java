package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.EstatisticasAdversarioMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversario;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversarioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.estatisticasAdversario.EstatisticasAdversarioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.EstatisticasAdversarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EstatisticasAdversarioService {

    @Autowired
    private EstatisticasAdversarioRepository estatisticasAdversarioRepository;

    @Autowired
    private EstatisticasAdversarioMapper estatisticasAdversarioMapper;

    public List<EstatisticasAdversarioDetailDTO> listar(){
        return estatisticasAdversarioRepository.findAll()
                .stream()
                .map(estatisticasAdversarioMapper::entityToDetailDTO)
                .toList();
    }

    public EstatisticasAdversarioDetailDTO salvar(EstatisticasAdversarioRequestDTO request){
        EstatisticasAdversario estatisticasAdversario = estatisticasAdversarioMapper.requestDTOToEntity(request);
        return estatisticasAdversarioMapper.entityToDetailDTO(
                this.estatisticasAdversarioRepository.save(estatisticasAdversario)
        );
    }

    @Transactional
    public EstatisticasAdversarioDetailDTO atualizar(Long codigo, EstatisticasAdversarioRequestDTO request){
        this.estatisticasAdversarioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "estatisticas não encontradas"));

        EstatisticasAdversario estatisticasAdversario = estatisticasAdversarioMapper.requestDTOToEntity(request);
        estatisticasAdversario.setCodigo(codigo);
        return estatisticasAdversarioMapper.entityToDetailDTO(
                this.estatisticasAdversarioRepository.save(estatisticasAdversario)
        );
    }

    @Transactional
    public void excluir(Long codigo){
        EstatisticasAdversario estatisticasAdversarioExcluir = this.estatisticasAdversarioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "estatisticas não encontradas"));
        estatisticasAdversarioRepository.delete(estatisticasAdversarioExcluir);
    }
}
