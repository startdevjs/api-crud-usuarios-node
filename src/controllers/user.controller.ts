import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";
import { Request, Response } from "express";
import {
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser,
} from "../repositorys/user.repository";

export const create = async (req: Request, res: Response) => {
  try {
    await userValidation.validate(req.body);

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const users = await getAll();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
