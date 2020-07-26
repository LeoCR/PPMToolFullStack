package io.laranibar.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.laranibar.ppmtool.domain.Project;
import io.laranibar.ppmtool.exceptions.ProjectIdException;
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
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
}
