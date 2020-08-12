package io.laranibar.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import io.laranibar.ppmtool.domain.Backlog;
import io.laranibar.ppmtool.domain.Project;
import io.laranibar.ppmtool.domain.ProjectTask;
import io.laranibar.ppmtool.exceptions.ProjectNotFoundException;
import io.laranibar.ppmtool.repositories.BacklogRepository;
import io.laranibar.ppmtool.repositories.ProjectRepository;
import io.laranibar.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask) {
		/**
		* Exception : Project not found
		**/
		try {

			/**
			* ProjectTask to be added to a specific project  
			* If project !=null , Backlog exists 
			**/
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			/**
			* set the Backlog to the ProjectTask
			*/
			projectTask.setBacklog(backlog);
			/**
			* we want our project sequence to be like this: IDPRO-1
			*/
			Integer BacklogSequence= backlog.getPTSequence();
			/**
			* update the Backlog Sequence
			**/
			BacklogSequence++;
			backlog.setPTSequence(BacklogSequence);
			/**
			 * Add Sequence to Project Task
			 */
			projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
			projectTask.setProjectIdentifier(projectIdentifier); 
			/**
			* Initial status when status is null
			*/
			if(projectTask.getStatus()==""||projectTask.getStatus()==null) {
				projectTask.setStatus("TO_DO");
			}
			/**
			* Initial priority when priority is null
			*/
			if(projectTask.getPriority()==0 ||projectTask.getPriority()==null) {
				projectTask.setPriority(3);
			}
			return projectTaskRepository.save(projectTask);
		} catch (Exception e) {
			throw new ProjectNotFoundException("Project not Found");
		}
		
	}

	public Iterable<ProjectTask> findBacklogById(String id) {
		
		Project project = projectRepository.findByProjectIdentifier(id);
		
		if(project==null) {
			throw new ProjectNotFoundException("Project with ID: "+id+" does not exist.");
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}
	
	public ProjectTask findPTByProjectSequence(String backlog_id,String pt_id) {
		/**
		* make sure we are searching on an existing backlog
		*/
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		if(backlog==null) {
			throw new ProjectNotFoundException("Project with ID: "+backlog_id+" does not exist.");
		}
		/**
		 * Make sure that our task exists
		 */
		ProjectTask projectTask=projectTaskRepository.findByProjectSequence(pt_id);
		if(projectTask==null) {
			throw new ProjectNotFoundException("Project Task "+pt_id+" not found.");
		}
		/**
		 * Make sure that the backlog/project id in the path corresponds to the right project
		 */
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project Task "+pt_id+" does not exists in project: "+backlog_id);
		}
		return projectTask;
	}
	public ProjectTask updateByProjectSequence(ProjectTask updatedTask,String backlog_id,String pt_id) {
		ProjectTask projectTask=this.findPTByProjectSequence(backlog_id,pt_id);		
		
		projectTask=updatedTask;
		
		return projectTaskRepository.save(projectTask);
		
	}
	public void deletePTByProjectSequence(String backlog_id,String pt_id) {
		ProjectTask projectTask=this.findPTByProjectSequence(backlog_id,pt_id);		
		
		/*
		Backlog backlog=projectTask.getBacklog();
		List<ProjectTask> pts=projectTask.getBacklog().getProjectTasks();
		pts.remove(projectTask);
		backlogRepository.save(backlog);
		*/
		
		projectTaskRepository.delete(projectTask);
	}
}
