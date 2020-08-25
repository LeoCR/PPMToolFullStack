package io.laranibar.ppmtool.web;


import io.laranibar.ppmtool.domain.Project;
import io.laranibar.ppmtool.services.MapValidationErrorService;
import io.laranibar.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.security.Principal;
@CrossOrigin
@RestController
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/create") 
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }
	@GetMapping("/getByIdentifier/{projectId}")
	public ResponseEntity<?> getProjectId(@PathVariable String projectId,Principal principal){
		Project project = projectService.findProjectByIdentifier(projectId,principal.getName());
		
		return new ResponseEntity<Project>(project,HttpStatus.OK);
	}
	@GetMapping("/getAll")
	public Iterable<Project> getAllProjects(Principal principal){
		return projectService.findAllProject(principal.getName());
	}
	@DeleteMapping("/delete/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectId,Principal principal){
		try {
			projectService.deleteProjectByIdentifier(projectId,principal.getName());
			return new ResponseEntity<String>("Project with ID:"+projectId+" was deleted succesfully.",HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("An error occurs: deleting:"+projectId+". Error Message: "+e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@PutMapping("/update")
	public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.OK);
    }
}
