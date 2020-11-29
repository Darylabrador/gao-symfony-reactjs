<?php

namespace App\Controller;

use App\Entity\Computer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ComputersController extends AbstractController
{
    /**
     * @Route("/api/computers", name="computers", methods="GET")
     */
    public function index(): JsonResponse
    {
        return new JsonResponse(["ordinateur" => 'recuperer les infos']);
    }


    /**
     * @Route("/api/computers/add", name="computers_add", methods="POST")
     */
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $computer = new Computer();
        $computer->setName($data['name']);
        $doctrine = $this->getDoctrine()->getManager();
        $doctrine->persist($computer);
        $doctrine->flush();
        return $this->json($computer);
    }
}
