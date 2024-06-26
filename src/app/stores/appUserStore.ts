import { makeAutoObservable, runInAction } from "mobx";
import { AppUser, AppUserFormValues } from "../models/user.ts";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";

export default class AppUserStore {
  appUsers: AppUser[] = [];
  selectedAppUser: AppUser | undefined = undefined;
  editMode = false;
  loadingInitial = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isActiveFilter = true;
  nameFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadAppUsers = async () => {
    try {
      let params = new URLSearchParams();
      if (this.nameFilter) params.append("name", this.nameFilter);
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.AppUsers.list(params);

      runInAction(() => {
        this.setAppUsers(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  getAppUserByUserName = (userName: string) => {
    return this.appUsers.find((appUser) => appUser.userName === userName);
  };

  saveAppUser = async (appUser: AppUserFormValues) => {
    this.submitting = true;
    try {
      await agent.AppUsers.create(appUser);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  updateAppUser = async (appUser: AppUserFormValues) => {
    this.submitting = true;
    try {
      await agent.AppUsers.edit(appUser);
      runInAction(() => {
        let updatedAppUser = {
          ...this.getAppUserByUserName(appUser.userName!),
          appUser,
        };
        this.selectedAppUser = updatedAppUser as AppUser;
      });
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  loadAppUserByUserName = async (userName: string) => {
    let appUser = this.getAppUserByUserName(userName);
    if (appUser) {
      this.selectedAppUser = appUser;
      return appUser;
    } else {
      this.setLoadingInitial(true);
      try {
        const appUser = await agent.AppUsers.details(userName);
        runInAction(() => {
          this.selectedAppUser = appUser;
        });
        this.setLoadingInitial(false);
        return appUser;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  toggleActive = async (userName: string) => {
    this.setSubmitting(true);
    try {
      await agent.AppUsers.toggleActive(userName);
      runInAction(() => {
        this.appUsers.find((a) => a.userName === userName)!.isActive =
          !this.appUsers.find((a) => a.userName === userName)!.isActive;
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingInitial = (value: boolean) => {
    this.loadingInitial = value;
  };

  setSubmitting = (value: boolean) => {
    this.submitting = value;
  };

  setNameFilter = (name: string) => {
    this.nameFilter = name;
  };

  setIsActiveFilter = (isActive: boolean) => {
    this.isActiveFilter = isActive;
  };

  setEditMode = (value: boolean) => {
    this.editMode = value;
  };

  setAppUsers = (appUsers: AppUser[]) => {
    this.appUsers = appUsers;
  };

  clearSelectedAppUser = () => {
    this.selectedAppUser = undefined;
  };
}
