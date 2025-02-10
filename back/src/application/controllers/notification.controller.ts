import { Controller, Get, Req, UseGuards, Put, Param } from "@nestjs/common";
import { NotificationService } from "../services/notification.service";
import { JwtAuthGuard } from "../../infrastructure/auth/guards/jwt-auth.guard";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserNotifications(@Req() req) {
    const userId = req.user.id;
    return this.notificationService.getNotificationsForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/read')
  async markNotificationAsRead(@Param('id') id: string) {
    return this.notificationService.markNotificationAsRead(id);
  }
}