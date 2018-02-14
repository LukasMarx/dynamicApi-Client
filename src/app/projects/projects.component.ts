import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddProjectDialogComponent } from './addProjectDialog/addProjectDialog.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(private dialog: MatDialog, private projectService: ProjectService) {}

  projects$;

  ngOnInit() {
    this.projects$ = this.projectService.getAllProjects();
  }

  onAddProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, { width: '50%', height: '50%' });
    dialogRef.afterClosed().subscribe((name: string) => {
      this.projectService.addProject({ name: name }).subscribe();
    });
  }
}
