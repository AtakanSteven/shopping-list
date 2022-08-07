import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { RequestRepository } from './request.repository';
import { ListService } from '../list/list.service';
import { IUserRequest } from '../auth/interface/request.user.interface';

@Injectable()
export class RequestService {
  constructor(private readonly requestRepository: RequestRepository, private readonly listService: ListService) {}

  async joinListRequest(profile: IUserRequest, listId: string) {
    const list = await this.listService.getListById(listId);
    if (list) {
      if (!list.owner.equals(profile._id)) {
        const isRequestExist = await this.requestRepository.isRequestExist(profile, listId);
        if (!isRequestExist) {
          return await this.requestRepository.joinListRequest(profile, list._id);
        }
        throw new UnprocessableEntityException('REQUEST_IS_ALREADY_AVAILABLE');
      }
      throw new BadRequestException('CANNOT_SEND_REQUEST_TO_YOURSELF');
    }
    throw new NotFoundException('NO_SUCH_LIST');
  }

  // todo: add accept and decline join list requests.
}
