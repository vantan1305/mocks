import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { updateUser } from "src/app/model/updateUser";
import { UserService } from "src/app/services/user.service";
import { ProfileDataService } from "../../services/data/profile-data.service";

interface staffType {
  value: string;
  viewValue: string;
}

interface education {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  isEditable: boolean = false;
  // @Input()userInfo: Users;

  // updateUser : updateUser;

  staffType: staffType[] = [
    { value: "Select", viewValue: "Chọn chức vụ của mình" },
    { value: "Cộng tác viên", viewValue: "Cộng tác viên" },
    { value: "Nhân viên chính thức", viewValue: "Nhân viên chính thức" },
    { value: "Nhân viên thử việc", viewValue: "Nhân viên thử việc" },
    { value: "Nhân viên thực tập", viewValue: "Nhân viên thử việc" },
  ];

  education: education[] = [
    { value: "Select", viewValue: "Bằng cấp cao nhất của mình" },
    { value: "Đại học", viewValue: "Đại học" },
    { value: "Cao Đẳng", viewValue: "Cao Đẳng" },
    { value: "Tiến Sĩ", viewValue: "Tiến sĩ" },
    { value: "Thạc Sĩ", viewValue: "Thạc Sĩ" },
    { value: "Học nghề", viewValue: "Học nghề" },
  ];
  // public id: any;
  userName: any;
  email: any;
  specialized: any;
  phone: any;
  // avatar: any;
  identityCard: any;
  homeTown: any;
  school: any;
  dob: any;
  firstName: any;
  middleName: any;
  lastName: any;
  imagePath: any;
  imgURL: string | ArrayBuffer;

  selectedFiles?: FileList;
  currentFile?: File;
  message = "";
  errorMsg = "";
  fileInfos: Observable<any>;
  progress = 0;
  progressInfos = [];

  // ??
  selectedFile: File;
  // imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  // message: string;
  avatarName: any;

  constructor(
    private profileService: ProfileDataService,
    private http: HttpClient,
    private router: Router,
    private routerA: ActivatedRoute,
    private userService: UserService
  ) {
    // this.id = this.routerA.snapshot.paramMap.get('id');
    // this.updateUser = new updateUser();
  }

  ngOnInit(): any {
    this.userName = localStorage.getItem("userName");
    this.email = localStorage.getItem("email");

    // this.fileInfos = this.userService.getFiles();
    // this.profileService.getUserInfo().subscribe(response => {
    //     this.userInfo = response
    //     console.log(response)
    //   },
    //   error => { console.log(error); }
    // )
  }
  allowEditing() {
    this.isEditable = true;
  }
  public saveProfile() {
    this.isEditable = false;
  }

  public updateAvatar() {
    // ??

    // console.log(this.selectedFile);
    // const uploadImageData = new FormData();
    // uploadImageData.append("avatar", this.selectedFile, this.selectedFile.name);

    // this.http
    //   .post("http://localhost:8888/image/uploadAvatar", uploadImageData, {
    //     observe: "response",
    //   })
    //   .subscribe((response) => {
    //     if (response.status === 200) {
    //       this.message = "Image uploaded successfully";
    //     } else {
    //       this.message = "Image not uploaded successfully";
    //     }
    //   });

    // ??
    // this.isEditable = false;
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.userService.uploadImage(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  getImage() {
    this.http.get('http://localhost:8080/image/get/' + this.avatarName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  public onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
    // this.progressInfos = [];

    // const files = event.target.files;
    // let isImage = true;

    // for (let i = 0; i < files.length; i++) {
    //   if (files.item(i).type.match('image.*')) {
    //     continue;
    //   } else {
    //     isImage = false;
    //     alert('invalid format!');
    //     break;
    //   }
    // }

    // if (isImage) {
    //   this.selectedFiles = event.target.files;
    // } else {
    //   this.selectedFiles = undefined;
    //   event.srcElement.percentage = null;
    // }
  }
}
