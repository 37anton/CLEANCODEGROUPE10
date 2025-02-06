import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { NotificationService } from "../../../application/services/notification.service";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { Request } from "express";
import { UserService } from "../../../application/services/user.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
    companyId?: string;
    clientId?: string;
  };
}

@Controller("notifications")
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService // ✅ Injecte UserService pour charger l'utilisateur
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserNotifications(@Req() req: AuthenticatedRequest) {
    if (!req.user || !req.user.id) {
      return { message: "❌ Utilisateur non authentifié." };
    }

    // ✅ Charger l'utilisateur en base de données avec ses relations
    const user = await this.userService.findById(req.user.id);
    if (!user) {
      return { message: "❌ Utilisateur non trouvé en base de données." };
    }

    return this.notificationService.getNotificationsForUser(user.id);
  }
}
