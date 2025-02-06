import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { NotificationService } from "../../application/services/notification.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserNotifications(@Req() req) {
    const userId = req.user.id;
    return this.notificationService.getNotificationsForUser(userId);
  }
}