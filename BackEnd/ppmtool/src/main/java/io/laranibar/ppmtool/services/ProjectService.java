package io.laranibar.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.laranibar.ppmtool.domain.Backlog;
import io.laranibar.ppmtool.domain.Project;
import io.laranibar.ppmtool.exceptions.ProjectIdException;
import io.laranibar.ppmtool.repositories.BacklogRepository;
import io.laranibar.ppmtool.repositories.ProjectRepository;

@Service
/**
 * Holding the business logic
 * @author leo
 *
 */
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private BacklogRepository backlogRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
			String projectIdentifier=project.getProjectIdentifier().toUpperCase();
			project.setProjectIdentifier(projectIdentifier);
			
			if(project.getId()==null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentifier);
			}
			if(project.getId()!=null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}
			return projectRepository.save(project);	
		} catch (Exception e) { 
			throw new ProjectIdException("Project ID: "+project.getProjectIdentifier().toUpperCase()+" already exists.");
		} 
	}
	public Project findProjectByIdentifier(String projectId) {
		Project project =projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if(project ==null) {
			throw new ProjectIdException("Project ID: "+projectId+" doesn't exists.");
		}
		return project;
	}
	public Iterable<Project> findAllProject(){ 
		return  projectRepository.findAll();
	}
	public void deleteProjectByIdentifier(String projectId) {
		Project project=projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		
		if(project==null) {
			throw new ProjectIdException("Cannot delete Project with ID: "+projectId.toUpperCase()+" . This Project does not exists.");
		}
		projectRepository.delete(project);
	}
}
